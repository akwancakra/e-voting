const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Clear all data (optional, for dev only)
  await prisma.userVoteCampaign.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.allowedEmail.deleteMany();
  await prisma.rule.deleteMany();
  await prisma.notif.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const voter1Password = await bcrypt.hash("voter123", 10);
  const voter2Password = await bcrypt.hash("voter456", 10);

  // Users
  const admin = await prisma.user.create({
    data: {
      email: "admin@evoting.com",
      name: "Admin E-Voting",
      password: adminPassword,
      role: "ADMIN",
      photo: null,
    },
  });
  const voter1 = await prisma.user.create({
    data: {
      email: "voter1@evoting.com",
      name: "Voter Satu",
      password: voter1Password,
      role: "VOTER",
      photo: null,
    },
  });
  const voter2 = await prisma.user.create({
    data: {
      email: "voter2@evoting.com",
      name: "Voter Dua",
      password: voter2Password,
      role: "VOTER",
      photo: null,
    },
  });

  // Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      title: "Pemilihan Ketua OSIS 2024",
      description: "Pilih ketua OSIS terbaik untuk masa depan sekolah!",
      banner: null,
      expiredAt: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000), // 31 hari ke depan
      finished: false,
      rules: {
        create: [
          {
            icon: "gavel",
            description: "Setiap siswa hanya boleh memilih satu kali.",
          },
          {
            icon: "verified",
            description: "Pemilih harus terdaftar di sistem.",
          },
        ],
      },
      allowedEmails: {
        create: [
          { email: "voter1@evoting.com" },
          { email: "voter2@evoting.com" },
        ],
      },
      candidates: {
        create: [
          {
            number: 1,
            chief_name: "Andi Wijaya",
            chief_instagram: "@andiwijaya",
            vice_name: "Budi Santoso",
            vice_instagram: "@budisantoso",
            description: "Pasangan calon OSIS dengan visi modernisasi sekolah.",
            visi: "Menjadikan OSIS sebagai pelopor inovasi di sekolah.",
            misi: "Meningkatkan partisipasi siswa dan digitalisasi kegiatan.",
            program:
              "Digitalisasi administrasi, pelatihan kepemimpinan, lomba inovasi.",
            banner: null,
          },
          {
            number: 2,
            chief_name: "Citra Dewi",
            chief_instagram: "@citradewi",
            vice_name: "Dedi Pratama",
            vice_instagram: "@dedipratama",
            description:
              "Pasangan calon OSIS dengan fokus pengembangan karakter.",
            visi: "Membentuk siswa berkarakter dan berprestasi.",
            misi: "Mengadakan pelatihan soft skill dan kegiatan sosial.",
            program: "Workshop soft skill, bakti sosial, seminar motivasi.",
            banner: null,
          },
        ],
      },
      notifs: {
        create: [
          { icon: "info", title: "Voting dimulai minggu depan!", photo: null },
          {
            icon: "event",
            title: "Debat kandidat akan diadakan Jumat.",
            photo: null,
          },
        ],
      },
    },
    include: { candidates: true },
  });

  // Voting dummy
  await prisma.userVoteCampaign.createMany({
    data: [
      {
        campaignId: campaign1.id,
        candidateId: campaign1.candidates[0].id,
        userId: voter1.id,
      },
      {
        campaignId: campaign1.id,
        candidateId: campaign1.candidates[1].id,
        userId: voter2.id,
      },
    ],
  });

  // Campaign 2
  const campaign2 = await prisma.campaign.create({
    data: {
      title: "Pemilihan Ketua BEM 2024",
      description: "Ayo pilih ketua BEM yang akan membawa perubahan!",
      banner: null,
      expiredAt: new Date(Date.now() + 62 * 24 * 60 * 60 * 1000), // 62 hari ke depan
      finished: false,
      rules: {
        create: [
          {
            icon: "gavel",
            description: "Setiap mahasiswa hanya boleh memilih satu kali.",
          },
        ],
      },
      allowedEmails: {
        create: [{ email: "voter1@evoting.com" }],
      },
      candidates: {
        create: [
          {
            number: 1,
            chief_name: "Eka Saputra",
            chief_instagram: "@ekasaputra",
            vice_name: "Fani Lestari",
            vice_instagram: "@fanilestari",
            description: "Pasangan calon BEM dengan visi kampus inklusif.",
            visi: "Mewujudkan kampus yang inklusif dan ramah inovasi.",
            misi: "Meningkatkan fasilitas dan dukungan untuk mahasiswa.",
            program: "Beasiswa, seminar, dan pengembangan komunitas.",
            banner: null,
          },
        ],
      },
      notifs: {
        create: [
          { icon: "info", title: "Voting BEM segera dibuka!", photo: null },
        ],
      },
    },
  });

  console.log("Database seeded successfully!");
  console.log("Default accounts created:");
  console.log("Admin: admin@evoting.com / admin123");
  console.log("Voter 1: voter1@evoting.com / voter123");
  console.log("Voter 2: voter2@evoting.com / voter456");
}

main()
  .then(() => {
    console.log("Database seeded!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
