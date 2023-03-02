interface Iprops {
  renderCards: Function;
}

const Carousel: any = (props: Iprops) => {
  const { renderCards } = props;

  return (
    <div className="Carousel" style={{ display: 'flex' }}>
      {renderCards && renderCards()}
    </div>
  );
};

export { Carousel };
