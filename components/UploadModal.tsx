

import useUploadModal from "@/hooks/useUploadModal";

import uniqid from "uniqid";

import {FieldValues,useForm , SubmitErrorHandler, SubmitHandler} from "react-hook-form";

import Modal from "./Modal";
import { fromJSON } from "postcss";
import {  useState } from "react";
import Input from "./Input";
import Button from "./Button";

import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { useRouter } from "next/navigation";



const UploadModal=()=>{
    const supabaseClient = useSupabaseClient();

    const [isLoading,setIsLoading]=useState(false);
    const   UploadModal=useUploadModal();
    const {user} =useUser();
    const router =useRouter();
    

    const {register,
        handleSubmit,
        reset
    }= useForm<FieldValues>({
        defaultValues:{
            author:'',
            title:'',
            song:null,
            image:'',
        }

    })
    const onChange=(open:boolean)=>{
        if(!open){
            reset();
            UploadModal.onClose();
        }
    }

const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
        setIsLoading(true);
        const imageFile = values.image?.[0];
        const songFile = values.song?.[0];

        // Check if files and user exist
        if (!imageFile || !songFile || !user) {
            toast.error('Missing fields');
            return ;
        }
        const uniqueID = uniqid();

        // Upload song file
        const { data: songData, error: songError } = await supabaseClient
            .storage
            .from('Songs') 
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
            });

        if (songError) {
            setIsLoading(false);
           return toast.error('Failed song upload.');
            
            
        }

        // Upload image file
        const { data: imageData, error: imageError } = await supabaseClient
            .storage
            .from('images') // Make sure the 'images' bucket exists in Supabase
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false,
            });

        if (imageError) {
            setIsLoading(false);
           return toast.error('Failed image upload.');
        }

        // Insert into database
        const { error: supabaseError } = await supabaseClient
            .from('songs')
            .insert({
                user_id: user.id,
                title: values.title,  // Ensure the column name is 'title'
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path,
            });

        if (supabaseError) {
            setIsLoading(false);
            return toast.error(supabaseError.message);
            
        }


        router.refresh();
        setIsLoading(false);
        toast.success('song created')
        reset();
        UploadModal.onClose();

    } catch (error) {
        toast.error("Something went wrong");
    }finally{
        setIsLoading(false);
    }
};



    return(
        <Modal 
        title="Add a song "
        description="upload an mp3 file"
        isOpen={UploadModal.isOpen}
        onChange={onChange}
        >   
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4
        "
        >
            <Input 
            id="title"
            disabled={isLoading}
            {...register('title',{required:true})}
            placeholder="song tittle"
            />
            
            
            <Input 
            id="author"
            disabled={isLoading}
            {...register('author',{required:true})}
            placeholder="song author"
            />

        <div>
            <div className="
            pb-1
            ">
                Select a song file


            <Input 
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song',{required:true})}
            />
           
            </div>
        </div>

            <div>
            <div className="
            pb-1
            ">
                Select an image


            <Input 
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image',{required:true})}
            />
           
            </div>
        </div>
        <Button disabled={isLoading} type="submit"
        >
            Create
        </Button>
            </form> 
        </Modal>
    );
}

export default UploadModal;