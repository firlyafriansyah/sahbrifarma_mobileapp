import * as React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/Components/ListMedicineRequest';

interface ListMedicineRequestProps {
  index?: number;
  medicine: string;
  preparation: string;
  dosage: number;
  rules: string;
  onPress?: any;
  deleteAction?: any;
  deleteMode?: boolean;
}

const ListMedicineRequest = (props: ListMedicineRequestProps) => {
  const {
    index = 0,
    medicine,
    preparation,
    dosage,
    rules,
    onPress = () => null,
    deleteAction = () => null,
    deleteMode = true,
  } = props;

  return (
    <TouchableOpacity
      style={styles.listMedicineRequestCard}
      onPress={() => onPress()}>
      <View>
        <Text style={styles.medicineRequest}>
          {medicine} - {preparation} - {dosage}gr
        </Text>
        <Text style={styles.medicineRequest}>{rules}</Text>
      </View>
      {deleteMode ? (
        <TouchableOpacity
          style={styles.deleteButtonWrapper}
          onPress={() => deleteAction()}>
          <FontAwesomeIcon icon={faTrashCan} size={22} color="#e84118" />
        </TouchableOpacity>
      ) : (
        <Text style={styles.numberText}>{index + 1}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ListMedicineRequest;
