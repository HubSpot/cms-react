import { useSharedIslandState } from '@hubspot/cms-components';
import { useEffect } from 'react';

async function getGatedContentIds(idsToCheck: number[]) {
  const options = {
    method: 'POST',
    body: JSON.stringify({ contentIds: idsToCheck }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await fetch(
    '/_hcms/content-access/get-gated-content-ids-for-member',
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then((data) => {
      return data['gatedContentIds'];
    })
    .catch((error) => {
      console.error('There was a problem with the Fetch operation:', error);
    });
}

interface GatedLockIconProps {
  idsToGateCheck: number[];
}

const GatedContentAPICheck = ({ idsToGateCheck }: GatedLockIconProps) => {
  const [sharedGatedIds, updateSharedGatedIds] = useSharedIslandState();
  useEffect(() => {
    getGatedContentIds(idsToGateCheck)
      .then((gatedIds: number[]) => {
        gatedIds && gatedIds.length
          ? updateSharedGatedIds(gatedIds)
          : updateSharedGatedIds([]);
      })
      .catch((err) => {
        console.log(err);
        updateSharedGatedIds([]);
      });
  }, []);
};

export default GatedContentAPICheck;
