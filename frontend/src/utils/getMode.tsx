// Function to detect light/dark mode
// const getMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';



// export default getMode;


const getMode = () => {
    const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    
    if (mode === "dark"){
        return [mode, "#18181B", "#202020"];    // main/alternative BG colors based on user color scheme
    }

    return [mode, "#f3f3f3", "#ffedbd"];

} 

export default getMode;
// return the colors respectively instead of returning just a mode
