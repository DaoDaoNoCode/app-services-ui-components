import {
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  FormGroupProps,
  Modal,
  ModalBoxBody,
  ModalVariant,
  TextInput,
} from "@patternfly/react-core";
import React, {
  Children,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  VoidFunctionComponent,
} from "react";
import { Trans, useTranslation } from "react-i18next";

const ModalContext = createContext<{
  isDeleteEnabled: boolean;
  isDeleting: boolean;
  setDeleteEnabled: (value: boolean) => void;
}>(null!);

export type DeleteModalProps = {
  /**
   * Flag to show the modal
   */
  isModalOpen: boolean;
  /**
   * Simple text content of the Modal Header, also used for aria-label on the body
   */
  title: string;
  /**
   * Flag to indicate if an asyncronous delete is in progress. Setting this to
   * `true` will disable all default controls.
   *
   * Note: any custom control will not be impacted by this flag
   */
  isDeleting: boolean;
  /**
   * OUIA component id. It's strongly suggested to specify it for specialized
   * delete dialogs, eg. the "Delete Kafka instance" dialog
   */
  ouiaId?: string;
  /**
   * The value the user must type to enable the delete button. The text
   * input will always be appended at the end of the modal.
   *
   * Leaving this field empty will make the delete button always enabled.
   *
   * To control where the confirmation field is placed, leave this field
   * `undefined` and use the `DeleteModalConfirmation` component in the structure
   * of the `children` property.
   */
  confirmationValue?: string;
  /**
   * Set this to `true` on Storybook when there are multiple modals open at a time.
   */
  disableFocusTrap?: boolean;
  /**
   * The parent container to append the modal to. Defaults to document.body
   */
  appendTo: () => HTMLElement;
  /**
   * A callback for when the delete button is clicked.
   */
  onDelete: () => void;
  /**
   * A callback for when the cancel or close button are clicked.
   */
  onCancel: () => void;
};

/**
 * A reusable component to show a dialog that handles deleting something in the
 * application.
 *
 * It supports both syncronous and asyncronous deletes, with or without a user
 * confirmation (typing something in a text field). The content of the dialog
 * can also be customized if needed.
 *
 * @example
 * const [isDeleting, setDeleting] = useState(false);
 * const [isOpen, setOpen] = useState(false);
 * const onCancel = () => setOpen(false);
 * const onDelete = () => {
 *   setDeleting(true);
 *   callApi()
 *     .then(() => {
 *       setDeleting(false);
 *       setOpen(false);
 *     })
 *     .catch(() => setDeleting(false))
 * }
 * <DeleteModal
 *   isDeleting={isDeleting}
 *   isModalOpen={isOpen}
 *   onCancel={onCancel}
 *   onDelete={onDelete}
 *   confirmationValue={"foo"}
 * >
 *  You are going to delete something!
 * </DeleteModal>
 */
export const DeleteModal: FunctionComponent<DeleteModalProps> = (props) => {
  const [isDeleteEnabled, setDeleteEnabled] = useState(
    props.confirmationValue === undefined
  );
  return (
    <ModalContext.Provider
      value={{
        isDeleting: props.isDeleting,
        isDeleteEnabled,
        setDeleteEnabled,
      }}
    >
      <DeleteModalConnected {...props} />
    </ModalContext.Provider>
  );
};

export const DeleteModalConnected: FunctionComponent<DeleteModalProps> = ({
  isModalOpen,
  title,
  isDeleting,
  confirmationValue,
  ouiaId = "delete-dialog",
  disableFocusTrap,
  appendTo,
  onDelete,
  onCancel,
  children,
}) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    onDelete();
  };
  const { isDeleteEnabled } = useContext(ModalContext);
  return (
    <Modal
      ouiaId={ouiaId}
      variant={ModalVariant.small}
      isOpen={isModalOpen}
      title={title}
      titleIconVariant={"warning"}
      showClose={!isDeleting}
      onClose={onCancel}
      appendTo={appendTo}
      disableFocusTrap={disableFocusTrap}
      hasNoBodyWrapper={true}
      actions={[
        <Button
          key={"confirm__button"}
          variant={ButtonVariant.danger}
          onClick={handleDelete}
          isDisabled={isDeleting || !isDeleteEnabled}
          isLoading={isDeleting}
          ouiaId={"delete"}
        >
          {t("common:delete")}
        </Button>,
        <Button
          key={"cancel__button"}
          variant={ButtonVariant.link}
          onClick={onCancel}
          isDisabled={isDeleting}
          ouiaId={"cancel"}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      {Children.toArray(children)
        .filter((f) => f)
        .map((c, idx) => (
          <ModalBoxBody key={idx}>{c}</ModalBoxBody>
        ))}
      {confirmationValue && (
        <ModalBoxBody>
          <DeleteModalConfirmation
            requiredConfirmationValue={confirmationValue}
          />
        </ModalBoxBody>
      )}
    </Modal>
  );
};

type DeleteModalConfirmationProps = {
  /**
   * The value the user must type to enable the delete button.
   */
  requiredConfirmationValue: string;
};
export const DeleteModalConfirmation: VoidFunctionComponent<
  DeleteModalConfirmationProps
> = ({ requiredConfirmationValue }) => {
  const [value, setValue] = useState("");
  const { isDeleting, setDeleteEnabled } = useContext(ModalContext);

  const onChange = (value: string) => {
    setValue(value);
    setDeleteEnabled(value === requiredConfirmationValue);
  };

  useEffect(() => {
    setDeleteEnabled(value === requiredConfirmationValue);
  }, [requiredConfirmationValue]);

  const id = "delete-confirmation-value";
  let validated: FormGroupProps["validated"] = "default";
  switch (true) {
    case value && value === requiredConfirmationValue:
      validated = "success";
      break;
    case value && value !== requiredConfirmationValue:
      validated = "warning";
      break;
  }
  return (
    <Form>
      <FormGroup
        label={
          <Trans
            i18nKey={"common:type_value_to_confirm"}
            values={{
              value: requiredConfirmationValue,
            }}
          />
        }
        fieldId={id}
      >
        <TextInput
          id={id}
          value={value}
          type="text"
          onChange={onChange}
          validated={validated}
          isDisabled={isDeleting}
          ouiaId={"delete-confirmation"}
        />
      </FormGroup>
    </Form>
  );
};
