import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const Error = ({classes, error}) => {
    const [open, setOpen] = useState(true)

    return (
        <Snackbar
            open={open}
            message={error.message}
            action={
                <Button color="secondary" size="small" onClick={() =>setOpen(false)}>Close</Button>
            }
        />
    )
}

export default Error;