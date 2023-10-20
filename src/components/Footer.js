import React from 'react'

export default function Footer({
    currentPage,
    totalPages,
    previousPage,
    nextPage,
    handlePageChange,
}) {
    return (
        <footer>
            {totalPages > 0 && (
                <ul className="pagination">
                    <li
                        className={`previous-btn ${
                            previousPage < 1 ? 'hidden' : ''
                        }`}>
                        <a href={`/?paged=${previousPage}`}>Previous</a>
                    </li>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            className={`page-number ${
                                currentPage === index + 1 ? 'active' : ''
                            }`}
                            key={index}>
                            <a
                                href={`/?paged=${index + 1}`}
                                onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </a>
                        </li>
                    ))}

                    <li
                        className={`next-btn ${
                            currentPage >= totalPages ? 'hidden' : ''
                        }`}>
                        <a href={`/?paged=${nextPage}`}>Next</a>
                    </li>
                </ul>
            )}
        </footer>
    )
}
