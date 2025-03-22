import { Container, Box, Typography, TextField, Button, MenuItem, InputLabel, FormControl, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

// Esquema de validación con Yup
const taskSchema = yup.object({
    taskName: yup.string().required("El nombre de la tarea es obligatorio"),
    taskDescription: yup.string().required("La descripción es obligatoria"),
    taskPriority: yup.string().required("La prioridad es obligatoria"),
    taskDueDate: yup.date().required("La fecha estimada es obligatoria").min(new Date(), "La fecha debe ser futura"),
});


function TaskPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            taskName: "",
            taskDescription: "",
            taskPriority: "medium",
        },
    });

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Board');
    };

    const onSubmit = (data: any) => {
        console.log(data);
        alert("Tarea creada con éxito!");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Crear Nueva Tarea
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {/* Campo para el nombre de la tarea */}
                <Controller
                    name="taskName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nombre de la tarea"
                            variant="outlined"
                            fullWidth
                            error={!!errors.taskName}
                            helperText={errors.taskName?.message}
                            required
                        />
                    )}
                />

                {/* Campo para la descripción de la tarea */}
                <Controller
                    name="taskDescription"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            error={!!errors.taskDescription}
                            helperText={errors.taskDescription?.message}
                            required
                        />
                    )}
                />

                {/* Campo para la prioridad de la tarea */}
                <Controller
                    name="taskPriority"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.taskPriority}>
                            <InputLabel id="priority-label">Prioridad</InputLabel>
                            <Select
                                {...field}
                                labelId="priority-label"
                                label="Prioridad"
                                required
                            >
                                <MenuItem value="low">Baja</MenuItem>
                                <MenuItem value="medium">Media</MenuItem>
                                <MenuItem value="high">Alta</MenuItem>
                            </Select>
                            {errors.taskPriority && (
                                <Typography variant="caption" color="error">
                                    {errors.taskPriority.message}
                                </Typography>
                            )}
                        </FormControl>
                    )}
                />

                {/* Campo para la fecha estimada de finalización */}
                <Controller
                    name="taskDueDate"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Fecha estimada de finalización"
                            type="date"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.taskDueDate}
                            helperText={errors.taskDueDate?.message}
                            required
                        />
                    )}
                />

                {/* Botón para enviar el formulario */}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: "flex-start" }}
                >
                    Crear Tarea
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: "flex-start" }}
                    onClick={handleLoginClick}
                >
                    Cancelar
                </Button>
            </Box>
        </Container>
    );
}

export default TaskPage;