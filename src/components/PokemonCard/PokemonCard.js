const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <p>{pokemon.name}</p>
    </div>
  );
};

export default PokemonCard;
