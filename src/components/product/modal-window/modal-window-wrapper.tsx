import ModalWindow from './modal-window';

type ModalWindowWrapperProps = {
    isModalVisible: boolean,
    onBackdropClick: () => void,
    guitarName: string,
    id: number,
}

console.log('modalwindowwrapper');

function ModalWindowWrapper ({onBackdropClick, isModalVisible, guitarName, id}:ModalWindowWrapperProps):  JSX.Element {
  if (!isModalVisible){
    return(
      <div>{null}</div>
    );
  }
  return(
    <ModalWindow onBackdropClick={onBackdropClick} isModalVisible={isModalVisible} guitarName={guitarName} id={id}/>
  );
}

export default ModalWindowWrapper;
