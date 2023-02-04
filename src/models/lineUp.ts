import {model, Schema, Document} from 'mongoose';

export interface Ilineup extends Document{ 
    userId: string;
    bandId: string;
}

const lineupSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    bandaId: {
        type: String,
        required: true
    }
});

export default model<Ilineup>('Lineup', lineupSchema);