function Button({ children }) {
  return (
    <button className="bg-gradient-to-br from-sky-600 to-sky-700 text-white border border-gray-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none hover:text-white duration-300 group hover:transition-all">
      <span className="bg-gray-400 shadow-gray-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
      {children}
    </button>
  );
}

export default Button;
