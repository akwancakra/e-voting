interface ConfirmModalProps {
    modalRef: any;
    onButtonClick: (isConfirmed: boolean) => void;
    cancelText?: string;
    confirmText?: string;
    isDanger?: boolean;
    modalTitle?: string;
    modalDescription?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    modalRef,
    onButtonClick,
    cancelText = "Cancel",
    confirmText = "Confirm",
    isDanger = false,
    modalTitle = "Confirm Action",
    modalDescription = "Are you sure want to proceed this?",
}) => {
    // const

    return (
        <dialog
            id="candidateModal"
            className="modal modal-bottom sm:modal-middle"
            ref={modalRef}
        >
            <div className="modal-box !rounded-xl p-5">
                <h3 className="font-semibold tracking-tighter text-lg sm:text-xl">
                    {modalTitle}
                </h3>
                <div
                    className="text-gray-500 text-sm"
                    dangerouslySetInnerHTML={{ __html: modalDescription }}
                ></div>
                <div className="modal-action">
                    <form method="dialog" className="w-full">
                        <div className="w-full grid grid-cols-2 gap-2 sm:flex justify-end">
                            <button
                                className="btn py-2 px-3 text-sm h-fit min-h-fit w-full sm:w-fit"
                                onClick={() => onButtonClick(false)}
                            >
                                {cancelText}
                            </button>
                            <button
                                className={`btn py-2 px-3 text-sm h-fit min-h-fit w-full sm:w-fit ${
                                    isDanger ? "btn-error" : "btn-primary"
                                }`}
                                onClick={() => onButtonClick(true)}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default ConfirmModal;
