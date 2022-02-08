import News from './TabNews/News';

export default function TabNews() {
  return (
    <div className="box">
      <div className='columns'>
        <div className='column'>
          <p className='is-size-4 has-text-right has-text-weight-light'>INVESTMENT AND TRADING NEWS</p>
        </div>
      </div>
      <News />
    </div>
  );
}

