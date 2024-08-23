import React from "react";
import useSlider, { SliderProps } from "./SliderHooks/useSlider";
import PositionLabel from "./components/PositionLabel";

const Slider: React.FC<SliderProps> = (props) => {
    const {
        handleMouseDown,
        handleTouchStart,
        predefinedPositionsToPercents,
        leftPercentage,
        thumbRef,
        trackRef,
        trackTailkRef,
    } = useSlider(props);

    return (
        <>
            <div className={props.className || "w-[300px]"}>
                <div className="relative justify-center flex flex-col  w-full" ref={trackRef}>
                    {predefinedPositionsToPercents &&
                        predefinedPositionsToPercents.map(({ position, positionInPercentage }, index) => (
                            <PositionLabel
                                position={position}
                                positionInPercentage={positionInPercentage}
                                key={index}
                            />
                        ))}

                    <div
                        className="w-full h-[30px] cursor-pointer "
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <div className="absolute top-2/4 -translate-y-2/4 h-[5px] w-full bg-gradient-to-r from-gray-500 to-gray-100 overflow-hidden">
                            <div
                                className="absolute pointer-events-none w-full h-full bg-gray-900"
                                ref={trackTailkRef}
                                style={{
                                    left: `${leftPercentage}%`,
                                }}
                            />
                        </div>
                        <div
                            className="absolute top-2/4 h-[20px] w-[20px] bg-gray-800 -translate-x-2/4 -translate-y-2/4 pointer-events-none rounded-full "
                            ref={thumbRef}
                            style={{
                                left: `${leftPercentage}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;
