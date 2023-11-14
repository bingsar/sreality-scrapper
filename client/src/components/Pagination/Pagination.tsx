import s from './Pagination.module.css';
import { Property } from '../data/typings/Property';

interface PaginationProps {
    properties: Property[];
    itemsPerPage: number;
    indexOfLastItem: number;
    setCurrentPage: (pageNumber: number) => void;
    propertyCount: number;
    currentPage: number;
    pageNumbers: number[];
}

const Pagination = ({ itemsPerPage, currentPage, indexOfLastItem, setCurrentPage, propertyCount }: PaginationProps) => {

    const handleActivePage = (number: number) => currentPage === number;

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    }

    const handleLastPage = () => {
        setCurrentPage(Math.ceil(propertyCount / itemsPerPage));
    }

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(propertyCount / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={s.pagination}>
            <div className={s.wrapper}>
                <button className={s.btn} onClick={handleFirstPage} disabled={currentPage === 1}>
                    First Page
                </button>
                <button className={s.btn} onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </button>
                {pageNumbers.map((number) => (
                    <button className={handleActivePage(number) ? `${s.active} ${s.btn}` : s.btn} key={number} onClick={() => handlePageClick(number)} disabled={number === currentPage}>
                        {number}
                    </button>
                ))}
                <button className={s.btn} onClick={handleNextPage} disabled={indexOfLastItem >= propertyCount}>
                    Next
                </button>
                <button className={s.btn} onClick={handleLastPage} disabled={indexOfLastItem >= propertyCount}>
                    Last Page
                </button>
            </div>
        </nav>
    )
}

export default Pagination