const Header = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between md:p-0 p-5 md:gap-0 gap-5">
        <h2 className="text-[#101828] text-2xl flex-1">Users</h2>
        <div className="flex flex-wrap gap-2">
          <button className="text-[#344054] border border-[#D0D5DD] hover:bg-light px-4 py-2.5 rounded-lg flex items-center gap-2">
            <img
              className="w-auto"
              src="./images/upload-cloud.svg"
              alt=""
            />
            Import
          </button>
          <button className="bg-[#7F56D9] hover:bg-primary text-white px-4 py-2.5 rounded-lg flex items-center gap-2 z-0">
            <img className="w-auto" src="./images/plus.svg" alt="" />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
