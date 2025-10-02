import { Loader } from './loader';

export const LoaderPop = function ({bgColor }) {
  return ( 
    <div className={`flex flex-row items-center justify-center fixed top-0 left-0 bottom-0 right-0 ${bgColor ?? "bg-[#00000020]"} z-1`}  >
      <div className='bg-white rounded-full '  >
              <Loader></Loader>
      </div>
    </div>
  );
}