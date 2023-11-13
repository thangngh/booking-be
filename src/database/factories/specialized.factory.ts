import { Specialized } from 'models/specialized/entities/specialized.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Specialized, async (seed) => {
    const specialized = new Specialized();
    return specialized;
});
