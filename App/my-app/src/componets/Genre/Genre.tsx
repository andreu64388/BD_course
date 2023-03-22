import React, { useEffect, useState } from "react";
import "./Genre.css";

interface GenreProps {
   headers: string[];
   data: any[];
   onEdit?: (index: number, values: any) => void;
   onDelete?: (index: number) => void;
}

const Genre: React.FC<GenreProps> = ({ headers, data, onEdit, onDelete }) => {
   const [editIndex, setEditIndex] = useState<number | null>(null);
   const [values, setValues] = useState<any[]>(data);

   useEffect(() => {
      setValues(data)
   }, [data])
   const handleEdit = (index: number) => {
      setEditIndex(index);
   };

   const handleDelete = (index: number) => {
      if (onDelete) {
         onDelete(index);
      }
   };

   const handleSave = (index: number) => {
      setEditIndex(null);
      if (onEdit) {
         onEdit(index, values[index]);
      }
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, header: string) => {
      const newValue = event.target.value;
      setValues((prevValues) =>
         prevValues.map((row, rowIndex) => {
            if (rowIndex === index) {
               return {
                  ...row,
                  [header]: newValue,
               };
            }
            return row;
         })
      );
   };

   return (
      <div className="table-container">
         <div className="table-header">
            {headers?.map((header, index) => (
               <div key={index} className="table-cell">
                  {header}
               </div>
            ))}
            <div className="table-cell buttons">Actions</div>
         </div>
         <div className="table-body">
            {values.map((row, index) => (
               <div key={index} className="table-row">
                  {headers?.map((header, colIndex) => (
                     <div key={colIndex} className="table-cell">
                        {editIndex === index ? (
                           <input type="text" value={row[header]} onChange={(event) => handleChange(event, index, header)} />
                        ) : (
                           row[header]
                        )}
                     </div>
                  ))}
                  <div className="table-cell buttons">
                     {editIndex === index ? (
                        <button onClick={() => handleSave(index)}>Save</button>
                     ) : (
                        <>
                           <button onClick={() => handleEdit(index)}>
                              <img src={process.env.PUBLIC_URL + "/icons/pencil.svg"} alt="" />
                           </button>
                           <button onClick={() => handleDelete(index)}>
                              <img src={process.env.PUBLIC_URL + "/icons/rubish.svg"} alt="" />
                           </button>
                        </>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Genre;
