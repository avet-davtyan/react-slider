import { MouseEvent, TouchEvent, useEffect, useMemo, useRef, useState } from "react";
import { createConversionFunctions } from "../helpers";

export interface SliderProps {
    predefinedPositions?: number[];
    minValue?: number;
    maxValue?: number;
    initialValue?: number;
    className?: string;
    onChange?: (index: number) => void;
}

const useSlider = ({ minValue = 0, maxValue = 100, predefinedPositions, initialValue = 0, onChange }: SliderProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const trackTailkRef = useRef<HTMLDivElement>(null);

    const [toPercentage, toValue] = useMemo(() => createConversionFunctions(minValue, maxValue), [minValue, maxValue]);

    const predefinedPositionsToPercents = useMemo(() => {
        return predefinedPositions?.map((position) => ({
            positionInPercentage: toPercentage(position),
            position,
        }));
    }, [predefinedPositions, minValue, maxValue]);
    const initialValueInPercent = useMemo(() => toPercentage(initialValue), [initialValue]);

    const [leftPercentage, setLeftPercentage] = useState<number>(initialValueInPercent);
    const leftPercentageRef = useRef(leftPercentage);

    const handleMove = (xPos: number) => {
        thumbRef.current!.style.transition = "none";
        trackTailkRef.current!.style.transition = "none";
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect) return;
        const leftPercent = Math.min(100, Math.max(0, (xPos / rect.width) * 100));
        setLeftPercentage(leftPercent);
        leftPercentageRef.current = leftPercent;
    };

    const handleMouseMove = (e: MouseEventInit | MouseEvent) =>
        e.clientX && handleMove(e.clientX - trackRef.current!.getBoundingClientRect().left);
    const handleTouchMove = (e: TouchEventInit | TouchEvent) =>
        e.touches && handleMove(e.touches[0].clientX - trackRef.current!.getBoundingClientRect().left);

    const handleMouseUp = () => {
        thumbRef.current!.style.transition = "all 0.2s";
        trackTailkRef.current!.style.transition = "all 0.2s";
        const callBackValue = predefinedPositions ? getNearestIndex() : toValue(leftPercentageRef.current);
        onChange && callBackValue != undefined && onChange(callBackValue);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchEnd = () => {
        thumbRef.current!.style.transition = "all 0.2s";
        trackTailkRef.current!.style.transition = "all 0.2s";
        const callBackValue = predefinedPositions ? getNearestIndex() : toValue(leftPercentageRef.current);
        onChange && callBackValue != undefined && onChange(callBackValue);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        handleMouseMove(e);
        thumbRef.current!.style.transition = "all 0.2s";
        trackTailkRef.current!.style.transition = "all 0.2s";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        handleTouchMove(e);
        thumbRef.current!.style.transition = "all 0.2s";
        trackTailkRef.current!.style.transition = "all 0.2s";
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
    };

    function getNearestIndex() {
        if (!predefinedPositions) return;
        let nearestIndex = 0;
        let smallestDifference = Math.abs(toPercentage(predefinedPositions[0]) - leftPercentageRef.current);

        for (let i = 1; i < predefinedPositions.length; i++) {
            let currentDifference = Math.abs(toPercentage(predefinedPositions[i]) - leftPercentageRef.current);
            if (currentDifference < smallestDifference) {
                smallestDifference = currentDifference;
                nearestIndex = i;
            }
        }
        setLeftPercentage(toPercentage(predefinedPositions[nearestIndex]));

        return nearestIndex;
    }

    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    return {
        handleMouseMove,
        handleTouchMove,
        handleMouseUp,
        handleTouchEnd,
        handleMouseDown,
        handleTouchStart,
        getNearestIndex,
        predefinedPositionsToPercents,
        leftPercentage,
        leftPercentageRef,
        trackRef,
        thumbRef,
        trackTailkRef,
    };
};

export default useSlider;
