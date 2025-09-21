import React from 'react';

export const POPModal = function POPModal({ children, onClose ,onOk ,bgColor }) {
  return ( 
    <div className={`w-full flex flex-row items-center justify-center fixed top-0 left-0 bottom-0 right-0 ${bgColor ?? "bg-[#00000020]"} z-1`}  >
      <div className='bg-white rounded-md p-3 w-[40%]'  >
        {children}
        <div className=' flex flex-row items-center justify-end gap-4 mt-4'>
            <button className='bg-orange-400 hover:bg-orange-500 text-md font-medium text-white py-2 px-4 rounded-md' onClick={onOk}>Okay</button>
            <button className='bg-red-500 hover:bg-red-600 text-md font-medium text-white py-2 px-4 rounded-md' onClick={onClose}>Close</button>
        </div> 
      </div>
    </div>
  );
}