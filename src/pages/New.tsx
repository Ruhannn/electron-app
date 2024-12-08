import ThemeToggle from "../components/ThemeToggle";

export default function New() {
  const open = () => {
    window.ipcRenderer.invoke("open-new-window", "ayaka");
  };
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <ThemeToggle />
      <button onClick={open}>Ayaka Image</button>
    </div>
  );
}
