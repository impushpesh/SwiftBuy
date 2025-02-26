import { useState } from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="input input-bordered w-full bg-white"
          />
        );
        break;
      case "select":
        element = (
          <select
            name={getControlItem.name}
            id={getControlItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              {getControlItem.label}
            </option>
            {getControlItem.options && getControlItem.options.length > 0
              ? getControlItem.options.map((optionItem) => (
                  <option key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </option>
                ))
              : null}
          </select>
        );
        break;
      case "textarea":
        element = (
          <textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="textarea textarea-bordered w-full "
          />
        );
        break;

      default:
        element = (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="input input-bordered w-full"
          />
        );
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="label mb-1">
              <span className="label-text text-gray-800 font-semibold">{controlItem.label}</span>
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-2 w-full">
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;
