import { memo } from "react";

function EmailInput({
  label,
  name,
  type,
  value,
  onChangeId,
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
          onChange={onChangeId}
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

export default memo(EmailInput);