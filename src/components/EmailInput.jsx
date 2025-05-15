export default function EmailInput({
  label,
  name,
  type,
  value,
  onChangeEmail,
  onChangeDomain,
  error,
  ref,
  domain,
  domainList,
}) {
  return (
    <>
      <div className="input_area">
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          className={error ? "error" : ""}
          type={type}
          value={value}
          onChange={onChangeEmail}
        />
        {domain && <span>@</span>}
        <select onChange={onChangeDomain} value={domain}>
          {domainList.map((item, i) => {
            return (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            );
          })}
          <option value={""}>직접입력</option>
        </select>
      </div>
      {error && <div className="error_message">{error}</div>}
    </>
  );
}
