import { Outlet } from "react-router-dom";
import shoppingImage2 from "../../assets/shopping-2.jpg";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-white w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome to SwiftBuy
          </h1>
          <img src={shoppingImage2} alt="shopping" className="w-full" />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;