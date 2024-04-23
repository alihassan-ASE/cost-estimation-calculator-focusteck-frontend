"use client";
import { Box, Typography, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

const QuestionsProgress = ({ currentQuestion, totalQuestions }) => {
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        const percentage = (currentQuestion * 100) / totalQuestions;
        setProgressPercentage(Math.round(percentage))
    }, [currentQuestion])

    return (
        <Box
            sx={{
                margin: "1em 0",
                paddingRight: "48px"
            }}
        >
            <Box
                sx={{
                    marginBottom: "46px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "23px"
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{
                            fontSize: "30px",
                            fontWeight: 700,
                        }}>
                        Question List
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "#005DBD",
                            color: "#fff",
                            borderRadius: "12px",
                            padding: "3px 15px"
                        }}
                    >
                        <Typography
                            variant='body1'
                            sx={{
                                fontSize: "12px"
                            }}
                        >{currentQuestion}</Typography>
                    </Box>
                </Box>
                <Typography
                    variant='p'

                >
                    These are the questions corresponding to the template you have selected, you can modify, add or delete them.
                </Typography>
            </Box>
            <Box>
                <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                        marginBottom: "10px",
                        height: "7px",
                        borderRadius: "20px"
                    }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end"
                    }}
                >

                    <Typography
                        variant='h4'
                        sx={{
                            fontSize: "16px",
                            fontWeight: 700
                        }}
                    >
                        Processing... {progressPercentage}%
                    </Typography>
                    <Box>
                        <Typography
                            variant='p'
                            sx={{
                                fontSize: "12px",
                                fontWeight: 400
                            }}
                        >
                            Total No
                        </Typography>
                        <Typography
                            variant='h4'
                            sx={{
                                fontSize: "16px",
                                fontWeight: 700
                            }}
                        >
                            {totalQuestions} Questions
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export default QuestionsProgress;