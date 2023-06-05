function Protected({ isAuthenticated, loginWithRedirect, children }) {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-darkbg">
        <div>Login inorder to add to cart</div>
        <input
          type="button"
          value="Login"
          className="p-2 text-white bg-black cursor-pointer w-fit"
          onClick={() => loginWithRedirect()}
        />
      </div>
    );
  }
  return children;
}
export default Protected;
