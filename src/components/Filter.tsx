import { ChangeEventHandler } from "react";

const Filter = ({ onFilterChange }: { onFilterChange: (filterValue: string) => void }) => {

    const handleFilterChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        onFilterChange(e.target.value);
    };

    return (
        <select onChange={handleFilterChange}>
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
        </select>
    );
};

export default Filter;