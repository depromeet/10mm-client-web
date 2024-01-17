import Thumbnail from '@/components/Thumbnail/Thumbnail';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

function ProfileList() {
  return (
    <section className={containerCss}>
      <ProfileItem name="나" />
    </section>
  );
}

export default ProfileList;

const containerCss = flex({
  padding: '16px',
  paddingBottom: '20px',
  gap: '12px',
  alignItems: 'stretch',
});

function ProfileItem(props: { name: string; url?: string }) {
  return (
    <div className={itemCss}>
      <Thumbnail size="h52" />
      <span className={nameCss}>{props.name}</span>
    </div>
  );
}

const itemCss = css({
  cursor: 'pointer',
});

const nameCss = css({
  textAlign: 'center',
  overflow: 'hidden',
  maxWidth: '100%',
  width: '100%',
  display: 'block',
  textOverflow: 'ellipsis',
  marginTop: '6px',
  textStyle: 'body6',
  color: 'text.primary',
});
