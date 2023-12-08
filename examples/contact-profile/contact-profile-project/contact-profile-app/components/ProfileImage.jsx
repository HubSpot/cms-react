import { Pencil } from './SVGs';

const AVATAR_BG_COLOR = 'rgb(142 124 195)';

const ProfileImage = ({ firstName = 'John Doe' }) => {
  return (
    <div
      style={{
        fontSize: '1rem',
        color: 'white',
        backgroundColor: AVATAR_BG_COLOR,
        borderRadius: '50%',
        height: '3rem',
        width: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {firstName && firstName.slice(0, 1)}
      <div
        style={{
          fontSize: '2rem',
          backgroundColor: AVATAR_BG_COLOR,
          borderRadius: '50%',
          height: '1.5rem',
          width: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '3px solid white',
          position: 'absolute',
          marginTop: '2.2rem',
          marginLeft: '2.2rem',
        }}
      >
        <Pencil
          style={{
            height: '0.7rem',
            width: '0.7rem',
            filter:
              'invert(100%) sepia(0%) saturate(7472%) hue-rotate(114deg) brightness(109%) contrast(97%)',
          }}
        />
      </div>
    </div>
  );
};

export default ProfileImage;
