export function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  };
}

export default function SanchesGroupRedirect() {
  return null;
}
