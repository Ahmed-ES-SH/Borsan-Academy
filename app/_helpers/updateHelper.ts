/* eslint-disable @typescript-eslint/no-explicit-any */
import { instance } from "./axios";

interface props {
  endpoint: string;
  id: number | string;
  updatedData: any;
  setStateFunction?: React.Dispatch<React.SetStateAction<any[]>>;
  setSuccess?: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
  onClosePopup?: () => void;
  onShowErrorAlert: () => void;
  onShowSuccessAlart: () => void;
  subListKey?: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>; // ✅ إضافة setLoading
}

export const handleUpdateItem = async ({
  endpoint,
  id,
  updatedData,
  setStateFunction,
  onClosePopup,
  setSuccess,
  setError,
  setErrors,
  onShowErrorAlert,
  onShowSuccessAlart,
  subListKey,
  setLoading, // ✅ تمرير setLoading
}: props): Promise<void> => {
  if (!id || !updatedData) return;

  // ✅ بدء التحميل
  if (setLoading) setLoading(true);

  try {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        key !== "created_at" &&
        key !== "updated_at"
      ) {
        const formattedValue = Array.isArray(value)
          ? JSON.stringify(value)
          : value;
        formData.append(key, formattedValue as string | Blob);
      }
    });

    const response = await instance.post(`${endpoint}/${id}`, formData);

    if (response.status === 200) {
      if (setStateFunction && subListKey) {
        setStateFunction((prevData) =>
          prevData.map((item) => ({
            ...item,
            [subListKey]: item[subListKey]?.map((subListitem: any) =>
              subListitem.id === id
                ? { ...subListitem, ...updatedData }
                : subListitem
            ),
          }))
        );
      }
      if (setSuccess) setSuccess("تم تعديل بيانات الرابط بنجاح.");
      if (onClosePopup) onClosePopup();
      onShowSuccessAlart();
    }
  } catch (error: any) {
    onShowErrorAlert();
    if (error.response?.data?.message || error.response?.data?.errors) {
      setError(error.response.data.message);
      if (setErrors) setErrors(error.response.data.errors);
    } else {
      setError(error.message || "خطأ غير متوقع");
    }
  } finally {
    // ✅ إيقاف التحميل بعد انتهاء العملية
    if (setLoading) setLoading(false);
  }
};
