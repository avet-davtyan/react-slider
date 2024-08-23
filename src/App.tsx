import Slider from "./Slider";

function App() {
    return (
        <>
            <div className="absolute h-full w-full flex items-center justify-center">
                <Slider
                    initialValue={50}
                    predefinedPositions={[25, 50, 75]}
                    onChange={(index) => {
                        console.log(`slider index changed to ${index}`);
                    }}
                />
            </div>
        </>
    );
}

export default App;
