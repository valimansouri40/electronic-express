

class apiFeature{
    constructor(data, query){
        this.data = data;
        this.query = query;
    }

    filters(){
        const queryObj = {...this.query};

        const deleteList = ['sort', 'limit', 'page', '?'];
        deleteList.forEach(el=> delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(e)=>`$${e}`);
        // console.log(queryStr)
        this.data = this.data.find(JSON.parse(queryStr));

        return this;
    }

    sort(){
        if(this.query.sort){
            const sort = this.query.sort.split(',').join(' ');

            this.data = this.data.sort(sort);
            
        }else{
            this.data = this.data.sort('-createAt');
        }
        return this;
    }

    paginate(){

        // console.log(this.query.page,'vali',this.query.limit )
        const page = this.query.page * 1 || 1;
        const limit = this.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.data = this.data.skip(skip).limit(limit);

        return this;
    }

    // dataLength(){
    //     this.data = this.data.find();
    //     return this;
    // }
}


module.exports = apiFeature;
