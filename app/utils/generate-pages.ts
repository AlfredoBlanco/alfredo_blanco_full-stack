export const generatePages = (page: number, totalPages: number) => {
    const totalShow = 5;
    const options = Math.floor(totalShow / 2);
    const startPage = Math.max(1, page - options);
    let endPage = Math.min(totalPages, page + options);

    if(page <= options) {
        endPage = Math.min(totalPages, totalShow);
    };

    const pageOptions: string[] = [];

    if(startPage > 1 ) {
        pageOptions.push('...');
    }

    for(let i = startPage; i <= endPage; i++) {
        pageOptions.push(String(i));
    }

    if(endPage < totalPages) {
        pageOptions.push('...');
    }

    return pageOptions;
}