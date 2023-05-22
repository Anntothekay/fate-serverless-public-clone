interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, text }: Props) => {
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-inner">
        <p className="danger mb-2em">Do you really wish to delete {text}?</p>
        <button className="btn btn-danger mr-1em mb-1em" onClick={onConfirm}>
          Delete
        </button>
        <button className="btn btn-outlined" onClick={onClose}>
          Cancel
        </button>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
