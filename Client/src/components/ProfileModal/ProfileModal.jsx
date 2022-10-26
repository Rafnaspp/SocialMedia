import { Modal, useMantineTheme } from '@mantine/core';

function ProfieModal({ modalOpened, setModalOpened }) {
    const theme = useMantineTheme();

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form className="infoForm">
                <h3>Your info</h3>
                <div>
                    <input type="text" className="infoInput" name='FirstName' placeholder='First Name' />
                    <input type="text" className="infoInput" name='LastName' placeholder='Last Name' />

                </div>
                <div>
                <input type="text" className="infoInput" name='worksAT' placeholder='Works AT' />
                </div>
                <div>
                    <input type="text" className="infoInput" name='livesIN' placeholder='Lives IN' />
                    <input type="text" className="infoInput" name='Country' placeholder='Country' />
                </div>
                <div>
                <input type="text" className="infoInput"  placeholder='Relation ship Status' />
                </div>
                <div>
                    Profile Image
                <input type="file" name='profileImg' />
                Cover Image 
                <input type="file" name='profileImg' />
  
                </div>
                <button className='button infoButton'>Update</button>
            </form>
        </Modal>
    );
}

export default ProfieModal