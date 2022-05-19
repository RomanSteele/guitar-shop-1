import ModalWindow from './modal-window';

type ModalWindowWrapperProps = {
    isModalVisible: boolean,
    onBackdropClick: () => void,
    guitarName: string,
}

console.log('modalwindowwrapper');

function ModalWindowWrapper ({onBackdropClick, isModalVisible, guitarName}:ModalWindowWrapperProps):  JSX.Element {
  if (!isModalVisible){
    return(
      <div>1</div>
    );
  }
  return(
    <ModalWindow onBackdropClick={onBackdropClick} isModalVisible={isModalVisible} guitarName={guitarName}/>
  );
}

export default ModalWindowWrapper;
