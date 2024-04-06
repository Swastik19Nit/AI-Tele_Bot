import Sidebar from "../_components/sidebar";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex w-full h-full justify-between  ">
    <Sidebar />
    <div className='md:w-[calc(100%-11rem)] '>
        {children}
    </div>
    </div>
  );
}