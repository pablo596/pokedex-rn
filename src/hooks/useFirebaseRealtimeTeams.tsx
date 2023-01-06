import {child, get, push, ref, remove} from 'firebase/database';
import {useState, useContext, useRef} from 'react';
import {db} from '../../config';
import {UserContext} from '../context/UserContextProvider';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {Region} from '../interfaces/regionsInterfaces';
import {Team} from '../interfaces/teamsInterfaces';

interface Payload {
  userId: string;
  pokemonsSelected: SimplePokemon[];
  region: Region;
  name: string;
  description: string;
}

interface Props {
  payload?: Payload;
  regionName?: string;
  key?: string;
}

export const useFirebaseRealtimeTeams = ({payload, regionName, key}: Props) => {
  const {userInfo} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reBuild, setReBuild] = useState(false);
  //   const [teams, setTeams] = useState<Team[]>([] as Team[]);
  const [teamsA, setTeamsA] = useState<Team[]>([] as Team[]);

  const teams = useRef<Team[]>([]);

  const createTeam = async () => {
    try {
      await push(
        ref(db, userInfo.id + '/teams/' + payload?.region.name),
        payload,
      );

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const removeTeam = async () => {
    remove(ref(db, userInfo.id + '/teams/' + regionName + '/' + key)).then(
      () => {
        setTimeout(() => {
          teams.current = [];
          setReBuild(true);
          retrieveTeams();
        }, 3000);
      },
    );
  };

  const retrieveTeams = async () => {
    setIsLoading(true);
    teams.current = [];
    try {
      get(child(ref(db), userInfo.id + '/teams/' + regionName))
        .then(snapshot => {
          snapshot.forEach(function (childSnapshot: any) {
            let keyNode = childSnapshot.key;
            let data = childSnapshot.val();
            teams.current = [...teams.current, {...data, key: keyNode}];
          });
          setIsLoading(false);
          setTeamsA(teams.current);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    teams,
    teamsA,
    isLoading,
    createTeam,
    retrieveTeams,
    removeTeam,
    reBuild,
  };
};
