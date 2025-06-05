export default function TextInput({
  image,
  label,
  holder,
  changeHandler,
  ref,
}) {
  return (
    <div className="input-main-container">
      <label className="input-main-container-label" htmlFor="text-input">
        {label}
      </label>
      <div className="input-container">
        <img src={image} />
        <input
          ref={ref}
          type="number"
          placeholder="0"
          onChange={(e) => changeHandler(holder, e.target.value)}
        />
      </div>
    </div>
  );
}
