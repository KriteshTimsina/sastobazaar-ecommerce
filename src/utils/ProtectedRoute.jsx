function Protected({ isAuthenticated, loginWithRedirect, children }) {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2 text-black bg-white dark:bg-darkbg dark:text-darktext">
        <img src="/assets/registration.gif" alt="Register" />
        <div>Register inorder to add your items to cart</div>
        <input
          type="button"
          value="Register"
          className="p-2 text-white bg-black cursor-pointer w-fit"
          onClick={() => loginWithRedirect()}
        />
      </div>
    );
  }
  return children;
}
export default Protected;
