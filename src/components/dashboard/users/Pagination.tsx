type IPaginate = {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}
export function Paginate({ postsPerPage, totalPosts, currentPage, paginate }: IPaginate) {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const visiblePages = (() => {
    if (pageNumbers.length <= maxVisiblePages) {
      return pageNumbers;
    }

    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    const firstVisiblePage = Math.max(1, currentPage - halfMaxVisiblePages);
    const lastVisiblePage = Math.min(
      pageNumbers.length,
      firstVisiblePage + maxVisiblePages - 1
    );

    let pages = [1, ...pageNumbers.slice(firstVisiblePage, lastVisiblePage)];

    
    if (lastVisiblePage < pageNumbers.length) {
      pages.push(0);
    }

    if (!pages.includes(pageNumbers.length)) {
      pages.push(pageNumbers.length);
    }

    return pages;
  })();

  return (
    <div className="w-full flex items-center justify-center">
      <ul className="flex gap-4">
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === 0 ? (
              <span className="text-ellipsis">...</span>
            ) : (
              <button 
                onClick={() => paginate(page)} 
                className={`w-8 h-8 rounded-full ${currentPage === page ?  "bg-gray-400 text-white" : ""}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
