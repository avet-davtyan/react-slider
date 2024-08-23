import Slider from "./Slider";

function App() {
    return (
        <>
            <div className="absolute h-full w-full flex items-center justify-center">
                <Slider
                    initialValue={40}
                    minValue={20}
                    maxValue={70}
                    predefinedPositions={[0, 50]}
                    onChange={(index) => {
                        console.log(`slider index changed to ${index}`);
                    }}
                />
            </div>
        </>
    );
}

export default App;
