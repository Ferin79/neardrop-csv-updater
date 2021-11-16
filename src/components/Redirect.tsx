import React, { useContext } from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useToasts } from "react-toast-notifications";
import { Context, ContextType } from "../data/Context";
import styles from "../styles/Redirect.module.css";

interface RedirectUrlProps {}

const PlaceHolderLink = "https://near.org";
const textAreaPlaceholder = "https://wallet.near.org/create";

export const getFormattedUrl = (data: string, input: string): string => {
  if (!input.trim().length) {
    return data;
  }
  const url = new URL(data);
  url.searchParams.append("redirectUrl", input);
  return url.toString();
};

const Redirect: React.FC<RedirectUrlProps> = () => {
  const { redirectInput, setRedirectInput, fileData, isChecked, setIsChecked } =
    useContext(Context) as ContextType;

  const { addToast } = useToasts();

  return (
    <div style={{ padding: "0 25px", width: "100%" }}>
      <p
        style={{
          margin: 10,
          fontSize: 16,
        }}
      >
        Choose a redirect URL
      </p>
      <div className={styles.inputWrapper}>
        <input
          placeholder={PlaceHolderLink}
          className={styles.sign_form_input}
          type="url"
          required
          value={redirectInput}
          onChange={(e) => setRedirectInput(e.target.value)}
        />

        <div
          className={styles.redirectIcon}
          onClick={() => {
            if (!redirectInput.trim().length) {
              window.open(PlaceHolderLink, "_blank", "noopener,noreferrer");
            } else {
              window.open(redirectInput, "_blank", "noopener,noreferrer");
            }
          }}
        >
          <MdOutlineOpenInNew size={25} color="white" />
        </div>
      </div>

      <div className={styles.testWrapper}>
        <p
          style={{
            margin: 10,
            fontSize: 16,
          }}
        >
          Test the first link from CSV
        </p>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.sign_form_input2}
            value={
              fileData[0]
                ? getFormattedUrl(fileData[0].link, redirectInput)
                : getFormattedUrl(textAreaPlaceholder, PlaceHolderLink)
            }
            readOnly
          />
          <div
            className={styles.redirectIcon2}
            onClick={() => {
              if (!redirectInput.trim().length) {
                addToast("Please provide valid redirect url", {
                  autoDismiss: true,
                  appearance: "warning",
                });
                return;
              }
              if (fileData[0]) {
                window.open(
                  getFormattedUrl(fileData[0].link, redirectInput),
                  "_blank",
                  "noopener,noreferrer"
                );
              } else {
                window.open(
                  getFormattedUrl(textAreaPlaceholder, PlaceHolderLink),
                  "_blank",
                  "noopener,noreferrer"
                );
              }
            }}
          >
            <MdOutlineOpenInNew size={25} color="white" />
          </div>
        </div>
      </div>

      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((old) => !old)}
        />
        <p>Remove this link from output CSV.</p>
      </div>
    </div>
  );
};
export default Redirect;
