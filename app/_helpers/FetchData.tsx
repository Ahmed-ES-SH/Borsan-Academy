export default async function FetchData(api: string, paginationState: boolean) {
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // إذا كان `paginationState` = true، نعيد البيانات مع معلومات الصفحات
    if (paginationState) {
      return {
        data: result.data || [],
        pagination: result.pagination || {},
      };
    }

    // إرجاع البيانات مباشرة بدون معلومات التصفح
    return result.data || [];
  } catch (error: unknown) {
    console.error("Error fetching data:", error);

    // يمكن إرجاع خطأ بشكل مناسب بدلاً من undefined
    return { error: "Something went wrong while fetching data." };
  }
}
