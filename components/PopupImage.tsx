interface PopupImage {
  url: string;
  onClose: () => void;
}

const PopupImage = (props: PopupImage) => {
  return (
    <div
      className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black"
      onClick={props.onClose}
    >
      <img
        src={props.url}
        className="max-w-[300px] rounded sm:max-h-[600px] sm:max-w-[720px]"
      />
    </div>
  );
};

export default PopupImage;
