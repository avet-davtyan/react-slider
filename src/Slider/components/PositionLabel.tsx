interface PositionLabelProps {
    position: number;
    positionInPercentage: number;
}

const PositionLabel: React.FC<PositionLabelProps> = ({ position, positionInPercentage }) => {
    return (
        <div
            className="absolute pointer-events-none -translate-y-2"
            style={{
                transform: "translate(0,-100%)",
                left: `${positionInPercentage}%`,
            }}
        >
            <p className="-translate-x-2/4">{position}</p>
            <div className="w-[1px] h-[10px] bg-black" />
        </div>
    );
};

export default PositionLabel;
