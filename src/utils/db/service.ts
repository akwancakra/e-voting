import { AllowedEmail } from "@/types/allowedEmail.types";
import { Campaign } from "@/types/campaign.type";
import { Candidate } from "@/types/candidate.types";
import { PrismaClient } from "@prisma/client";
import { UserVoteCampaign } from "@/types/userVoteCampaign.types";
import { Notif } from "@/types/notif.types";

const prisma = new PrismaClient();

//? AUTH HERE
export async function signIn(userData: { email: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  return user || null;
}

/**
 * Asynchronously signs in the user with Google authentication.
 *
 * @param {any} userData - user data for signing in
 * @param {any} callback - callback function to handle the result
 */
export async function signInWithGoogle(userData: any, callback: any) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    userData.role = existingUser.role;

    try {
      await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          photo: userData.image,
        },
      });

      callback({
        status: true,
        message: "Sign In with Google Success!",
        data: userData,
      });
    } catch (err) {
      callback({ status: false, message: "Sign In with Google failed!" });
    }
  } else {
    userData.role = "VOTER";

    try {
      await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          photo: userData.image,
        },
      });

      callback({
        status: true,
        message: "Sign In with Google Success!",
        data: userData,
      });
    } catch (err) {
      callback({ status: false, message: "Sign In with Google failed!" });
    }
  }
}

//? CAMPAIGNS HERE
export async function getCampaigns({
  keyword = "",
  active = true,
  limit = 5,
  getAll = false,
  skip = 0,
}: {
  keyword?: string;
  active?: boolean;
  limit?: number;
  getAll?: boolean;
  skip?: number;
}) {
  try {
    const currentDate = new Date();
    // Query campaign dari database menggunakan Prisma
    const where: any = {
      ...(keyword && { title: { contains: keyword, mode: "insensitive" } }),
      ...(active && { expiredAt: { gte: currentDate } }),
    };
    const campaigns = await prisma.campaign.findMany({
      where,
      skip,
      take: getAll ? undefined : limit,
      orderBy: { createdAt: "desc" },
      include: {
        candidates: true,
        allowedEmails: true,
        rules: true,
      },
    });
    return { campaigns, totalCampaigns: campaigns.length };
  } catch (error) {
    console.error("Error in getCampaigns:", error);
    return { campaigns: [], totalCampaigns: 0 };
  }
}

/**
 * Retrieves a campaign by its ID and calculates candidate votes and notifications.
 *
 * @param {Object} id - The ID of the campaign to retrieve
 * @return {Object} The campaign with candidate votes and notifications
 */
export async function getCampaignById({ id = 0 }: { id?: number }) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        rules: true,
        allowedEmails: true,
        candidates: true,
        notifs: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        userVoteCampaign: true,
      },
    });
    if (!campaign) return null;

    // Mapping agar sesuai type
    const candidates = (campaign.candidates as any[]).map((c) => ({
      ...c,
      createdAt: c.createdAt?.toString() ?? "",
      updatedAt: c.updatedAt?.toString() ?? undefined,
      campaign: campaign,
      userVoteCampaign: [], // relasi ini bisa diisi jika perlu
    }));
    const userVoteCampaigns = (campaign.userVoteCampaign as any[]).map((v) => ({
      ...v,
      createdAt: v.createdAt?.toString() ?? "",
      updatedAt: v.updatedAt?.toString() ?? undefined,
      campaign: campaign,
      candidate: candidates.find((c) => c.id === v.candidateId),
      user: undefined, // relasi user bisa diisi jika perlu
    }));
    const notifs = (campaign.notifs as any[]).map((n) => ({
      ...n,
      createdAt: n.createdAt?.toString() ?? "",
      updatedAt: n.updatedAt?.toString() ?? undefined,
      campaign: campaign,
    }));
    // Hitung suara kandidat
    const candidateVotes: Record<
      number,
      { totalVotes: number; percentage: number }
    > = {};
    candidates.forEach((candidate) => {
      const candidateId = candidate.id;
      candidateVotes[candidateId] = { totalVotes: 0, percentage: 0 };
    });
    let totalVotes = 0;
    userVoteCampaigns.forEach((vote) => {
      const candidateId = vote.candidateId;
      if (candidateVotes[candidateId]) {
        candidateVotes[candidateId].totalVotes++;
        totalVotes++;
      }
    });
    for (const candidateId in candidateVotes) {
      const votes = candidateVotes[candidateId].totalVotes;
      candidateVotes[candidateId].percentage =
        totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
    }
    // Notif group by date
    const notifsByDate: Record<string, any[]> = {};
    const sortedNotifsData = notifs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    sortedNotifsData.forEach((notif) => {
      const dateKey = new Date(notif.createdAt).toISOString().split("T")[0];
      notifsByDate[dateKey] = notifsByDate[dateKey] || [];
      notifsByDate[dateKey].push(notif);
    });
    const campaignWithCandidateVotes = {
      ...campaign,
      candidates,
      userVoteCampaign: userVoteCampaigns,
      notifs,
      notifsGroupedByDate: notifsByDate,
      result: candidateVotes,
      totalVotes: totalVotes,
    };
    return campaignWithCandidateVotes;
  } catch (error) {
    console.error("Error in getCampaignById:", error);
    return null;
  }
}
//? CAMPAIGNS HERE

//* CUD CAMPAIGN
export async function createCampaign(campaignData: any, callback: Function) {
  let transactionResult: any;
  const todayDate = new Date().toISOString();
  try {
    // Memulai transaksi Prisma
    await prisma.$transaction(async (prismaTransaction) => {
      // Membuat kampanye dan mendapatkan ID
      transactionResult = await prismaTransaction.campaign.create({
        data: {
          title: campaignData.title,
          description: campaignData.description,
          expiredAt: campaignData.expiredAt,
          createdAt: todayDate,
        },
        select: { id: true },
      });

      // Membuat kandidat
      await prismaTransaction.candidate.createMany({
        data: campaignData.candidates.map((candidate: any) => ({
          number: candidate.number,
          chief_name: candidate.chief_name,
          chief_instagram: candidate.chief_instagram,
          vice_name: candidate.vice_name,
          vice_instagram: candidate.vice_instagram,
          description: candidate.description,
          visi: candidate.visi,
          misi: candidate.misi,
          program: candidate.program,
          createdAt: todayDate,
          campaignId: transactionResult.id,
        })),
      });

      // Membuat email yang diizinkan
      await prismaTransaction.allowedEmail.createMany({
        data: campaignData.allowedEmails.map((email: any) => ({
          email: email.email,
          createdAt: todayDate,
          campaignId: transactionResult.id,
        })),
      });
    });

    // Transaksi berhasil
    const campaignId = transactionResult.id;
    callback({
      status: true,
      message: "Campaign and related entities created successfully.",
      data: { campaignId },
    });
  } catch (error) {
    // Rollback dilakukan otomatis oleh Prisma dalam kasus kesalahan
    console.error("Error creating campaign and related entities:", error);
    callback({ status: false, message: error });
  }
}

/**
 * Edit a campaign in the database.
 *
 * @param {number} id - The ID of the campaign to be edited.
 * @param {any} campaignData - The data to be updated for the campaign.
 * @param {Function} callback - The callback function to be executed after editing the campaign.
 * @return {Promise<void>} A promise that resolves after the campaign is edited.
 */
export async function editCampaign({
  id = 0,
  campaignData = {},
  callback = () => {},
}: {
  id: number;
  campaignData: any;
  callback: Function;
}) {
  let transactionResult: any;
  const todayDate = new Date().toISOString();

  try {
    const campaign = await prisma.campaign.findFirst({
      where: {
        id: id || undefined,
      },
    });

    if (!campaign) {
      // Handle case when campaign is not found
      throw new Error("Campaign not found");
    }

    // BEFORE UPDATE THE CAMPAIGN DO:
    // 1. DELETE ALLOWED EMAILS IF ALLOWED EMAILS WE GOT IS DIFFERENT OR SOME IS MISSING FROM DATABASE
    const allowedEmailsOld = await prisma.allowedEmail.findMany({
      where: {
        campaignId: id,
      },
    });

    let allowedEmailsToDelete: any,
      allowedEmailsToUpdate: AllowedEmail[],
      allowedEmailsToCreate: any;
    if (allowedEmailsOld) {
      // SEARCH ALLOWED EMAILS THAT NOT FOUND IN ALLOWED EMAILS WE GOT
      allowedEmailsToDelete = allowedEmailsOld.filter(
        (allowedEmail) =>
          !campaignData.allowedEmails.find(
            (email: any) => email.id === allowedEmail.id
          )
      );

      // SEARCH ALLOWED EMAILS THAT HAS SAME ID BUT DIFFERENT DATA
      allowedEmailsToUpdate = campaignData.allowedEmails.filter((email: any) =>
        allowedEmailsOld.find((allowedEmail) => allowedEmail.id === email.id)
      );

      // SEARCH ALLOWED EMAILS THAT NEW DATA
      allowedEmailsToCreate = campaignData.allowedEmails.filter(
        (email: any) =>
          !allowedEmailsOld.find(
            (allowedEmail) => allowedEmail.email === email.email
          )
      );
    }

    await prisma.$transaction(async (prismaTransaction) => {
      // EDIT CAMPAIGN DATA
      transactionResult = await prismaTransaction.campaign.update({
        data: {
          title: campaignData.title,
          description: campaignData.description,
          expiredAt: campaignData.expiredAt,
          updatedAt: todayDate,
        },
        select: { id: true },
        where: {
          id: id || undefined,
        },
      });

      // EDIT CANDIDATE DATA
      for (const candidate of campaignData.candidates) {
        if (candidate.id) {
          // Jika id ada, update
          await prismaTransaction.candidate.update({
            where: {
              id: candidate.id,
            },
            data: {
              number: candidate.number,
              chief_name: candidate.chief_name,
              chief_instagram: candidate.chief_instagram,
              vice_name: candidate.vice_name,
              vice_instagram: candidate.vice_instagram,
              description: candidate.description,
              visi: candidate.visi,
              misi: candidate.misi,
              program: candidate.program,
              updatedAt: todayDate,
            },
          });
        } else {
          // Jika id tidak ada, buat baru
          await prismaTransaction.candidate.create({
            data: {
              number: candidate.number,
              chief_name: candidate.chief_name,
              chief_instagram: candidate.chief_instagram,
              vice_name: candidate.vice_name,
              vice_instagram: candidate.vice_instagram,
              description: candidate.description,
              visi: candidate.visi,
              misi: candidate.misi,
              program: candidate.program,
              createdAt: todayDate,
              updatedAt: todayDate,
              campaignId: id,
            },
          });
        }
      }

      // ADD, EDIT OR DELETE ALLOWED EMAIL DATA
      if (allowedEmailsToDelete.length > 0) {
        await prismaTransaction.allowedEmail.deleteMany({
          where: {
            id: {
              in: allowedEmailsToDelete.map(
                (allowedEmail: AllowedEmail) => allowedEmail.id
              ),
            },
          },
        });
      }

      if (allowedEmailsToCreate.length > 0) {
        await prismaTransaction.allowedEmail.createMany({
          data: allowedEmailsToCreate.map((email: any) => ({
            email: email.email,
            campaignId: id,
            createdAt: todayDate,
          })),
        });
      }

      if (allowedEmailsToUpdate.length > 0) {
        await Promise.all(
          allowedEmailsToUpdate.map(async (email: AllowedEmail) => {
            await prismaTransaction.allowedEmail.update({
              where: {
                id: email.id,
              },
              data: {
                email: email.email,
                updatedAt: todayDate,
              },
            });
          })
        );
      }
    });

    // EDIT RULE DATA
    // -SOON-

    // Transaksi berhasil
    const campaignId = transactionResult.id;
    callback({
      status: true,
      message: "Campaign and related entities edited successfully.",
      data: { campaignId },
    });
  } catch (error) {
    // Rollback dilakukan otomatis oleh Prisma dalam kasus kesalahan
    console.error("Error editing campaign and related entities:", error);
    callback({ status: false, message: error });
  }
}

/**
 * Deletes a campaign and all associated data.
 *
 * @param {object} param0 - Object containing the ID of the campaign to be deleted
 * @param {number} param0.id - The ID of the campaign to be deleted
 * @return {Promise<void>} A promise that resolves after the campaign and associated data are deleted
 */
export async function deleteCampaign({ id = 0 }: { id: number }) {
  if (typeof id !== "number" || id <= 0) {
    throw new Error("Invalid campaign ID");
  }

  try {
    await prisma.$transaction([
      // 1. DELETE ALL USER VOTE CAMPAIGN
      prisma.userVoteCampaign.deleteMany({
        where: {
          campaignId: id,
        },
      }),
      // 2. DELETE ALL CANDIDATES
      prisma.candidate.deleteMany({
        where: {
          campaignId: id,
        },
      }),
      // 3. DELETE ALL ALLOWED EMAILS
      prisma.allowedEmail.deleteMany({
        where: {
          campaignId: id,
        },
      }),
      // 4. DELETE ALL RULES
      prisma.rule.deleteMany({
        where: {
          campaignId: id,
        },
      }),
      // 5. DELETE ALL NOTIFS
      prisma.notif.deleteMany({
        where: {
          campaignId: id,
        },
      }),
      // 6. DELETE CAMPAIGN
      prisma.campaign.delete({
        where: {
          id,
        },
      }),
    ]);
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Finish a campaign by updating its status and expiration date.
 *
 * @param {Object} param - An object containing the campaign ID.
 * @param {number} param.id - The ID of the campaign to be finished.
 * @return {Promise} - A promise that resolves to the updated campaign object.
 */
export async function finishCampaign({ id = 0 }: { id: number }) {
  if (!id && typeof id !== "number" && id <= 0) {
    throw new Error("Invalid campaign ID");
  }

  try {
    // FIRST GET THE USER VOTE CAMPAIGN, AND CALCULATE WHO IS THE MOST VOTED
    // THEN SET HIM AS WINNDER_CANDIDATE ON CAMPAIGN
    const votes = await prisma.userVoteCampaign.findMany({
      where: {
        campaignId: id,
      },
    });

    // GET THE MOST VOTED
    const candidateVotesMap = new Map<number, number>();

    votes.forEach((vote) => {
      const candidateId = vote.candidateId;

      if (candidateVotesMap.has(candidateId)) {
        candidateVotesMap.set(
          candidateId,
          candidateVotesMap.get(candidateId)! + 1
        );
      } else {
        candidateVotesMap.set(candidateId, 1);
      }
    });

    // FIND THE MOST VOTED CANDIDATE
    let mostVotedCandidateId: number | null = null;
    let maxVotes = 0;

    candidateVotesMap.forEach((votes, candidateId) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        mostVotedCandidateId = candidateId;
      }
    });

    // THEN FINISH AND UPDATE CAMPAIGN
    if (mostVotedCandidateId !== null) {
      await prisma.campaign.update({
        where: {
          id,
        },
        data: {
          finished: true,
          winner_candidate: mostVotedCandidateId,
          expiredAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error("Error finishing campaign:", error);
    throw error;
  }
}

//! USER VOTE CAMPAIGN HERE
export async function voteByIdCampaign({
  campaignId = 0,
  userId = 0,
  candidateId = 0,
  email = "",
  photo,
  callback = () => {},
}: {
  campaignId: number;
  userId: number;
  candidateId: number;
  email: string;
  photo?: string;
  callback: Function;
}) {
  if (
    campaignId &&
    campaignId >= 0 &&
    userId &&
    userId >= 0 &&
    candidateId &&
    candidateId >= 0 &&
    email
  ) {
    const today = new Date();
    const existingVote = await prisma.userVoteCampaign.findFirst({
      where: {
        AND: {
          campaignId,
          userId,
        },
      },
    });

    if (!existingVote) {
      try {
        const userEmail = email.split("@")[1];
        const campaign: any = await prisma.campaign.findFirst({
          where: {
            id: campaignId,
          },
          include: {
            allowedEmails: true,
            candidates: true,
          },
        });

        if (!campaign) {
          throw new Error("Campaign not found");
        }

        if (!campaign.candidates) {
          throw new Error("Candidates not found for the campaign");
        }

        const candidateDetail: any = campaign.candidates.find(
          (candidate: any) => candidate.id === candidateId
        );

        if (!candidateDetail) {
          throw new Error("Candidate not found");
        }

        const isAllowedToVote = campaign.allowedEmails.some(
          (email: any) => email.email === userEmail
        );

        if (today > new Date(campaign?.expiredAt)) {
          return callback({
            status: false,
            message: "Campaign is expired",
          });
        } else if (!isAllowedToVote) {
          return callback({
            status: false,
            message: "You are not allowed to vote",
          });
        }

        await prisma.$transaction(async (prismaTransaction) => {
          // Tambahkan operasi create ke dalam transaksi
          await prismaTransaction.userVoteCampaign.create({
            data: {
              candidateId,
              campaignId,
              userId,
            },
          });

          await prismaTransaction.notif.create({
            data: {
              campaignId,
              icon: "account_circle",
              title: `${email} vote ${String(candidateDetail.number).padStart(
                2,
                "0"
              )} on ${campaign.title}`,
              createdAt: today.toISOString(),
              photo,
            },
          });
        });

        callback({
          status: true,
          message: "Vote Successfully",
        });
      } catch (error) {
        console.error("Error creating vote:", error);
        callback({
          status: false,
          message: "Failed to vote",
        });
      }
    } else {
      callback({
        status: false,
        message: "You already vote",
      });
    }
  } else {
    callback({
      status: false,
      message: "Please provide all required data",
    });
  }
}

//? NOTIFS HERE
export async function getAllNotifs({
  limit = 5,
  groupedByDate = false,
}: {
  limit?: number;
  groupedByDate?: boolean;
}) {
  const notifsData = await prisma.notif.findMany({
    take: limit,
  });

  if (groupedByDate) {
    // Mengelompokkan notifikasi berdasarkan tanggal
    const notifsByDate: Record<string, any[]> = {};
    // Urutkan notifikasi berdasarkan createdAt yang terbaru
    const sortedNotifsData = notifsData.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    sortedNotifsData.forEach((notif) => {
      const dateKey = notif.createdAt.toISOString().split("T")[0];
      notifsByDate[dateKey] = notifsByDate[dateKey] || [];
      notifsByDate[dateKey].push(notif);
    });

    return notifsByDate;
  } else {
    // Jika tidak perlu mengelompokkan berdasarkan tanggal, kembalikan langsung notifsData
    return notifsData;
  }
}

/**
 * Retrieves all notifications by campaign.
 *
 * @param {Object} options - Options for filtering notifications
 * @param {number} options.limit - The maximum number of notifications to retrieve
 * @param {number} options.campaignId - The ID of the campaign to filter notifications by
 * @return {Promise<Notif[]>} A list of notifications filtered by campaign
 */
export async function getAllNotifsByCampaign({
  limit = 5,
  campaignId = 0,
}: {
  limit?: number;
  campaignId?: number;
}) {
  return await prisma.notif.findMany({
    where: {
      campaignId: campaignId || undefined,
    },
    take: limit,
  });
}

//? ALLOWED EMAILS HERE
// CHANGE BECAUSE THIS CAN BE USED FOR INSERT AND EDIT EMAILS
export async function changeAllowedEmails({
  campaignId = 0,
  emails = [],
}: {
  campaignId: number;
  emails: AllowedEmail[];
}) {
  let transactionResult: any;

  try {
    if (!campaignId || campaignId <= 0) {
      throw new Error("Invalid campaign ID");
    }

    // GET ALL ALLOWED EMAILS FOR THIS CAMPAIGN
    const allowedEmails = await prisma.allowedEmail.findMany({
      where: {
        campaignId,
      },
    });

    // CHECK IF THERE ARE ALLOWEDEMAILS MISSING FROM EMAILS, MEANING DELETE THE DATA THAT DOES NOT EXIST IN EMAILS
    const deleteAllowedEmails = allowedEmails.filter(
      (allowedEmail) => !emails.some((email) => email.id === allowedEmail.id)
    );

    const createNewAllowedEmails = emails.filter(
      (email) => !email.id || email.id <= 0
    );

    const updateAllowedEmails = emails.filter(
      (email) => email.id && email.id > 0
    );

    // Start a Prisma transaction
    transactionResult = await prisma.$transaction(async (prisma) => {
      // DELETE ALLOWED EMAILS THAT ARE NOT IN THE NEW LIST
      await prisma.allowedEmail.deleteMany({
        where: {
          id: {
            in: deleteAllowedEmails.map((email) => email.id),
          },
        },
      });

      // CREATE NEW ALLOWED EMAILS
      await prisma.allowedEmail.createMany({
        data: createNewAllowedEmails.map((email) => ({
          email: email.email,
          campaignId: campaignId,
        })),
      });

      // UPDATE EXISTING ALLOWED EMAILS
      for (const email of updateAllowedEmails) {
        await prisma.allowedEmail.updateMany({
          where: {
            id: email.id,
          },
          data: {
            email: email.email,
            campaignId: campaignId,
          },
        });
      }
    });

    return {
      status: true,
      message: "Allowed emails updated successfully.",
    };
  } catch (error) {
    console.error("Error updating allowed emails:", error);

    // Rollback in case of an error
    if (transactionResult) {
      console.log("Rollback changes...");
      await prisma.$executeRaw`ROLLBACK;`;
    }

    return { status: false, message: "Error updating allowed emails." };
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}
