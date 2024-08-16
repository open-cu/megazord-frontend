export const downloadCsv = (csvString: string) => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Установите имя файла для загрузки
    document.body.appendChild(link);
    link.click();

    // Очистка ссылки после загрузки
    document.body.removeChild(link);
};